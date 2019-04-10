import * as React from 'react'
import { renderToString } from 'react-dom/server'

function curlyStart() {
  return '{'
}

function curlyEnd() {
  return '}'
}

export const renderSigninPage = (
    clientId: string
) => {

    const shouldUseJsx = `
    <html lang="en">
      <head>
        <meta name="google-signin-client_id" content="${clientId}">
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </head>
      <body>
        <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
        <div id="display-status">im display status</div>
        
        <script>
                function onSignIn(googleUser) {
                    var profile = googleUser.getBasicProfile();
                    document.getElementById("display-status").textContent = profile.getName();
                    sendTokenToBackend(googleUser);
                }

                function sendTokenToBackend(googleUser) {
                    var id_token = googleUser.getAuthResponse().id_token;
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', '/tokenSignin');
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onload = function() {
                        console.log('Signed in as: ' + xhr.responseText);
                    };
                    xhr.send('idtoken=' + id_token);
                }
        </script>
      </body>
    </html>
    `;
    return shouldUseJsx;
}