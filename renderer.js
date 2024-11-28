const func = async () => {
    const response = await window.versions.ping();  // Calls the 'ping' function exposed by preload.js
    console.log(response);  // Should log 'pong'
  };
  
  func();
  