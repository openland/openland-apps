exports.default = async function(configuration) {
    const TOKEN = "fD8KHUMgvpxqJqKK" // Fuck it - token is always unplugged
  
    console.log(configuration);

    require("child_process").execSync(
      `java -jar ${__dirname}/jsign-2.1.jar --keystore ${__dirname}/hardwareToken.cfg --storepass "${TOKEN}" --storetype PKCS11 --tsaurl http://timestamp.digicert.com --alias "Data Makes Perfect Inc" "${configuration.path}"`,
      {
        stdio: "inherit"
      }
    );
  };