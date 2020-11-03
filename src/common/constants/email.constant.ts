export const ConfirmationEmail = (email: string, hash: string ) => {
    return (`<body link="#00a5b5" vlink="#00a5b5" alink="#00a5b5">
  
    <table class=" main contenttable" align="center" style="font-weight: normal;border-collapse: collapse;border: 0;margin-left: auto;margin-right: auto;padding: 0;font-family: Arial, sans-serif;color: #555559;background-color: white;font-size: 16px;line-height: 26px;width: 600px;">
          <tr>
              <td class="border" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;">
                  <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0 auto;padding: 0;font-family: Arial, sans-serif;">
                      <tr>
                          </td>
                      </tr>
                      <tr>
                          <td valign="top" class="side title" style="border-collapse: collapse;border: 0;margin: 0 auto;padding: 20px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;vertical-align: top;background-color: white;border-top: none;text-align:center;">
                              <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0 auto;padding: 0;font-family: Arial, sans-serif;">
                                  <tr>
                                      <td class="head-title" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 28px;line-height: 34px;font-weight: bold; text-align: center;">
                                          <div class="mktEditable" id="main_title" style="text-align:center; color: #007CFF">
                                              Confirm your registration
                                          </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="sub-title" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;padding-top:5px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 18px;line-height: 29px;font-weight: bold;text-align: center;">
                                      <div class="mktEditable" id="intro_title">
                                          
                                      
                                        If it was you, confirm your registration please
                                      </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="top-padding" style="border-collapse: collapse;border: 0;margin: 0;padding: 5px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;"></td>
                                  </tr>
                                  <tr>
                                      <td class="grey-block" style="border-collapse: collapse;border: 0;margin: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background-color: #fff; text-align:center;">
                                      <div class="mktEditable" id="cta">
                                      <img class="top-image" src="https://i.ibb.co/PN4n2t2/waiting-Registration.png" width="350"/><br><br>
                                        <a style="background: #007CFF; color: white; text-decoration: none; padding: 10px 20px; font-size: 22; border-radius: 5px;"href="http://localhost:3000/email-tokens/email-verify/${hash}?email=${email}">CONFIRM</a>
                                      </div>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                          <td valign="top" class="footer" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background: #fff;text-align: center;">
                              <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0;padding: 0;font-family: Arial, sans-serif;">
                                  <tr>
                                      <td class="inside-footer" align="center" valign="middle" style="border-collapse: collapse;border: 0;margin: 0;padding: 20px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 12px;line-height: 16px;vertical-align: middle;text-align: center;width: 580px;">
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
    </body>`)
}

export const ResetPasswordEmail = (email: string, hash: string ) => {
    return (`<body link="#00a5b5" vlink="#00a5b5" alink="#00a5b5">
  
    <table class=" main contenttable" align="center" style="font-weight: normal;border-collapse: collapse;border: 0;margin-left: auto;margin-right: auto;padding: 0;font-family: Arial, sans-serif;color: #555559;background-color: white;font-size: 16px;line-height: 26px;width: 600px;">
          <tr>
              <td class="border" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;">
                  <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0 auto;padding: 0;font-family: Arial, sans-serif;">
                      <tr>
                          </td>
                      </tr>
                      <tr>
                          <td valign="top" class="side title" style="border-collapse: collapse;border: 0;margin: 0 auto;padding: 20px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;vertical-align: top;background-color: white;border-top: none;text-align:center;">
                              <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0 auto;padding: 0;font-family: Arial, sans-serif;">
                                  <tr>
                                      <td class="head-title" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 28px;line-height: 34px;font-weight: bold; text-align: center;">
                                          <div class="mktEditable" id="main_title" style="text-align:center; color: #007CFF">
                                              Reset your password
                                          </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="sub-title" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;padding-top:5px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 18px;line-height: 29px;font-weight: bold;text-align: center;">
                                      <div class="mktEditable" id="intro_title">
                                          
                                      
                                        If it was you, confirm your password reset
                                      </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="top-padding" style="border-collapse: collapse;border: 0;margin: 0;padding: 5px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;"></td>
                                  </tr>
                                  <tr>
                                      <td class="grey-block" style="border-collapse: collapse;border: 0;margin: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background-color: #fff; text-align:center;">
                                      <div class="mktEditable" id="cta">
                                      <img class="top-image" src="https://i.ibb.co/PN4n2t2/waiting-Registration.png" width="350"/><br><br>
                                        <a style="background: #007CFF; color: white; text-decoration: none; padding: 10px 20px; font-size: 22; border-radius: 5px;"href="http://localhost:3000/email-tokens/password-reset/${hash}?email=${email}">CONFIRM</a>
                                      </div>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                          <td valign="top" class="footer" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background: #fff;text-align: center;">
                              <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0;padding: 0;font-family: Arial, sans-serif;">
                                  <tr>
                                      <td class="inside-footer" align="center" valign="middle" style="border-collapse: collapse;border: 0;margin: 0;padding: 20px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 12px;line-height: 16px;vertical-align: middle;text-align: center;width: 580px;">
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
    </body>`)
} 
export const ConfirmationResetPasswordEmail= (email: string, password: string ) => {
    return (`<body link="#00a5b5" vlink="#00a5b5" alink="#00a5b5">
  
    <table class=" main contenttable" align="center" style="font-weight: normal;border-collapse: collapse;border: 0;margin-left: auto;margin-right: auto;padding: 0;font-family: Arial, sans-serif;color: #555559;background-color: white;font-size: 16px;line-height: 26px;width: 600px;">
          <tr>
              <td class="border" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;">
                  <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0 auto;padding: 0;font-family: Arial, sans-serif;">
                      <tr>
                          </td>
                      </tr>
                      <tr>
                          <td valign="top" class="side title" style="border-collapse: collapse;border: 0;margin: 0 auto;padding: 20px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;vertical-align: top;background-color: white;border-top: none;text-align:center;">
                              <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0 auto;padding: 0;font-family: Arial, sans-serif;">
                                  <tr>
                                      <td class="head-title" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 28px;line-height: 34px;font-weight: bold; text-align: center;">
                                          <div class="mktEditable" id="main_title" style="text-align:center; color: #007CFF">
                                              Your Password Was Reseted
                                          </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="sub-title" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;padding-top:5px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 18px;line-height: 29px;font-weight: bold;text-align: center;">
                                      <div class="mktEditable" id="intro_title">
                                          
                                      
                                        This is new password: ${password}
                                        Your Email: ${email}
                                      </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="top-padding" style="border-collapse: collapse;border: 0;margin: 0;padding: 5px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;"></td>
                                  </tr>
                                  <tr>
                                      <td class="grey-block" style="border-collapse: collapse;border: 0;margin: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background-color: #fff; text-align:center;">
                                      <div class="mktEditable" id="cta">
                                      <img class="top-image" src="https://i.ibb.co/PN4n2t2/waiting-Registration.png" width="350"/><br><br>
                                      </div>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                          <td valign="top" class="footer" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background: #fff;text-align: center;">
                              <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0;padding: 0;font-family: Arial, sans-serif;">
                                  <tr>
                                      <td class="inside-footer" align="center" valign="middle" style="border-collapse: collapse;border: 0;margin: 0;padding: 20px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 12px;line-height: 16px;vertical-align: middle;text-align: center;width: 580px;">
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
    </body>`)
}