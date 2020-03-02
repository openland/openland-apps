import Foundation
import AsyncDisplayKit

class ChatFlowLayout: UICollectionViewFlowLayout {
  private var topVisibleItem =  Int.max
  private var bottomVisibleItem = -Int.max
  private var offset: CGFloat = 0.0
  private var visibleAttributes: [UICollectionViewLayoutAttributes]?
  private var isPrepend: Bool = false
  private var isInitial: Bool = true
  
  override open func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
    // Reset offset and prepend scope
    visibleAttributes = super.layoutAttributesForElements(in: rect)
    offset = 0.0
    isPrepend = false
    return visibleAttributes
  }
  
  override open func prepare(forCollectionViewUpdates updateItems: [UICollectionViewUpdateItem]) {
    guard let collectionView = self.collectionView else { return }
    guard let visibleAttributes = self.visibleAttributes else { return }
    
    // Calculate Bottom and Top Visible Item Count
    bottomVisibleItem = -Int.max
    topVisibleItem = Int.max
    var containerHeight: CGFloat = collectionView.frame.size.height
    containerHeight -= collectionView.contentInset.top
    containerHeight -= collectionView.contentInset.bottom
    let container = CGRect(x: collectionView.contentOffset.x,
                           y: collectionView.contentOffset.y,
                           width: collectionView.frame.size.width,
                           height: containerHeight)
    for attributes in visibleAttributes {
      if attributes.frame.intersects(container) {
        let item = attributes.indexPath.item

        if item < topVisibleItem {
          topVisibleItem = item
        }
        
        if item > bottomVisibleItem {
          bottomVisibleItem = item
        }
      }
    }
    
    
    
    super.prepare(forCollectionViewUpdates: updateItems)
    
    // TODO: fix scroll jumps _sometimes_ on last forward batch
    if(isInitial || ((collectionView.contentOffset.y + collectionView.contentInset.top) < 20 && (collectionView.numberOfItems(inSection: 0) == 0))){
      if(collectionView.numberOfItems(inSection: 1) != 0){
        isInitial = false
      }
      self.isPrepend = false
      return
    }
    

    // Check: Initial Load or Load More
    var isInitialLoading: Bool = bottomVisibleItem + topVisibleItem == 0
    if(collectionView.numberOfItems(inSection: 1) == 0){
      isInitialLoading = true;
    }
    // Chack: Pre-Append or Append
    if (updateItems.first?.indexPathAfterUpdate?.item ?? 0 == 0 &&
      (updateItems.first?.updateAction == .insert || updateItems.first?.updateAction == .delete) &&
      !isInitialLoading) {
      self.isPrepend = true
    } else {
      return
    }

    // Calculate Offset
    let inserts = updateItems.filter { $0.updateAction == .insert }
    let paths = inserts.map { $0.indexPathAfterUpdate }
//      .filterNil()
    let topItems = paths.filter { topVisibleItem + updateItems.count > $0!.item }
    let layouted = topItems.map { self.layoutAttributesForItem(at: $0!) }
//      .filterNil()
    let lyoutedWithSpacing = layouted.map { $0!.size.height + self.minimumLineSpacing }
    offset = lyoutedWithSpacing.reduce(0.0, { $0 + $1 })
    
    let contentHeight = collectionView.contentSize.height
    var frameHeight = collectionView.frame.size.height
    frameHeight -= collectionView.contentInset.top
    frameHeight -= collectionView.contentInset.bottom
    guard contentHeight + offset > frameHeight else {
      // Exception
      self.isPrepend = false
      return
    }
    CATransaction.begin()
    CATransaction.setDisableActions(true)
  }
  
  override open func finalizeCollectionViewUpdates() {
    guard let collectionView = self.collectionView, isPrepend else { return }
    // Adjust Content Offset
    let newContentOffset = CGPoint(x: collectionView.contentOffset.x,
                                   y: collectionView.contentOffset.y + self.offset)
    collectionView.contentOffset = newContentOffset
    CATransaction.commit()
  }
}
