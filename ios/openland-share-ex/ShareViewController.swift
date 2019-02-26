import UIKit
import Social
import MobileCoreServices

class ShareViewController: UIViewController {
  
  var docPath = ""
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    let containerURL = FileManager().containerURL(forSecurityApplicationGroupIdentifier: "group.com.openland")!
    docPath = "\(containerURL.path)/share"
    
    //  Create directory if not exists
    do {
      try FileManager.default.createDirectory(atPath: docPath, withIntermediateDirectories: true, attributes: nil)
    } catch let error as NSError {
      print("Could not create the directory \(error)")
    } catch {
      fatalError()
    }
    
    //  removing previous stored files
    let files = try! FileManager.default.contentsOfDirectory(atPath: docPath)
    for file in files {
      try? FileManager.default.removeItem(at: URL(fileURLWithPath: "\(docPath)/\(file)"))
    }
  }
  
  override func viewDidAppear(_ animated: Bool) {
    
    let alertView = UIAlertController(title: nil, message: "Sharing...", preferredStyle: .alert)
    
    let loadingIndicator = UIActivityIndicatorView(frame: CGRect(x: 10, y: 5, width: 50, height: 50))
    loadingIndicator.hidesWhenStopped = true
    loadingIndicator.style = UIActivityIndicatorView.Style.gray
    loadingIndicator.startAnimating();
    
    alertView.view.addSubview(loadingIndicator)
    
    self.present(alertView, animated: true, completion: {
      
      let group = DispatchGroup()
      
      NSLog("inputItems: \(self.extensionContext!.inputItems.count)")
      
      var fileUrls = [String]()
      var strings = [String]()
      for item: Any in self.extensionContext!.inputItems {
        
        let inputItem = item as! NSExtensionItem
        
        
        for provider: Any in inputItem.attachments! {
          
          let itemProvider = provider as! NSItemProvider
          group.enter()
          
          itemProvider.loadItem(forTypeIdentifier: kUTTypeData as String, options: nil) { data, error in
            if error == nil {
              switch data{
              case is URL:
                let url = data as! URL
                let path = "\(self.docPath)/\(url.pathComponents.last ?? "")"
                try? FileManager.default.copyItem(at: url, to: URL(fileURLWithPath: path))
                fileUrls.append(path)
              case is String:
                fileUrls.append(data as! String)
              default:
                print("ok swift, here is your default executable statement")
              }
            }
            group.leave()
          }
          
          group.enter()
          itemProvider.loadItem(forTypeIdentifier: kUTTypeURL as String, options: nil) { data, error in
            if error == nil {
              let url = data as! URL
              strings.append(url.absoluteString)
            } else {
              NSLog("\(error)")
            }
            group.leave()
          }
        }
      }
      
      group.notify(queue: DispatchQueue.main) {
        do {
          let jsonData : Data = try JSONSerialization.data(
            withJSONObject: [
              "files" : fileUrls.count > 0 ? fileUrls : nil,
              "strings" : strings.count > 0 ? strings : nil,
              ],
            options: JSONSerialization.WritingOptions.init(rawValue: 0))
          let jsonString = (NSString(data: jsonData, encoding: String.Encoding.utf8.rawValue)! as String).addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
          let result = self.openURL(URL(string: "openland://deep/share?data=\(jsonString!)")!)
        } catch {
          alertView.message = "Error: \(error.localizedDescription)"
        }
        self.dismiss(animated: false) {
          self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
        }
      }
    })
  }
  
  //  Function must be named exactly like this so a selector can be found by the compiler!
  //  Anyway - it's another selector in another instance that would be "performed" instead.
  @objc func openURL(_ url: URL) -> Bool {
    var responder: UIResponder? = self
    while responder != nil {
      if let application = responder as? UIApplication {
        return application.perform(#selector(openURL(_:)), with: url) != nil
      }
      responder = responder?.next
    }
    return false
  }
}
