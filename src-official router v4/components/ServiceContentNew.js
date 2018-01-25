const React = require('react');
const PropTypes = React.PropTypes;

const getStyles =(props,context)=>{
  const theme = context.muiTheme;
  return {
    root: {
      marginLeft: '-24px',
      marginRight: '-24px'
    },
    h2: {
      paddingBottom: '26px',
      marginTop: '-16px',
      color: '#000',
      opacity: '87%',
      fontSize: '20px'
    },
    p: {
      margin: '0 auto 10px',
      color: 'rgba(0,0,0,.87)',
      fontSize: '14px',
      fontWeight: '300'
    },
    h4: {
      color: 'rgba(0,0,0,.87)',
      fontSize: '14px',
      fontWeight: '300'
    },
    content: {
      height: '340px',
      background: '#F0F0F0',
      padding:'10px',
      overflow: 'auto',
      color: 'rgba(0,0,0,.87)',
      fontWeight: '300',
      fontSize: '14px',
      lineHeight: '22px',
      width: '500px',
      boxSizing: 'border-box'
    },
    footer: {
      display: 'inline-block',
      float: 'right',
    },
    buttonMargin: {
      marginRight: '10px',
    },
  }
}

export default class ServiceContent extends React.Component{
  static contextTypes = {
  	muiTheme: PropTypes.object,
  }

  static propTypes = {
    nTextServiceContentPrimary: PropTypes.string,
    nTextServiceContentSecondary: PropTypes.string,
  }

  static defaultProps = {
    nTextServiceContentPrimary: 'Terms of Service',
    nTextServiceContentSecondary: 'Please read the following Terms of Service',
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    return (
      <div style={styles.root}>
        <h2 style={styles.h2}>
          E-PORTS Term of Service
        </h2>
        <p style={styles.p}>
          {this.props.nTextServiceContentPrimary}
        </p>
        <div style={styles.content}>
          <h4 style={styles.h4}>Terms & Conditions</h4>
          <p style={styles.p}>
            Thank you for visiting E-PORTS platform.
            In using or visiting E-PORTS, you are deemed to have read and agreed to the following terms and conditions.
          </p>
          <p style={styles.p}>
            The following terminology applies to these Terms and Conditions. Privacy Statement and Disclaimer Notice and any or all Agreements:
            "You" and "Your" refers to user or visitor who accessing our platform and accepting our terms and conditions.
            "Our","We" and "Us" refers to our company.
          </p>
          <h4 style={styles.h4}>Privacy Statement</h4>
          <p style={styles.p}>
            We are committed to protecting your privacy. If, you do not consent to the collection, use and disclosure of your personal information,
            as well as the other terms and conditions below, please exit immediately and do not use this platform. We constantly review our system
            and data to ensure the best possible service to you. However, these terms and conditions may need to be changed as we update or
            introduce new features and version to E-PORTS. The right to all text, images and other materials on this site are reserved to us.
          </p>
          <h4 style={styles.h4}>Disclaimer</h4>
          <h4 style={styles.h4}>Exclusions and Limitations</h4>
          <p style={styles.p}>
            The information on E-PORTS platform is provided on "as is" basis. E-PORTS:
            <li>
              excludes all representations and warranties relating to E-PORTS platform and its contents or which is or maybe provided by
              affiliates or any other third party, including in relation to any inaccuracies or omissions in E-PORTS
              platform and/or our company's literature; and
            </li>
            <li>
              excludes all liability for damages arising out of or in connection with your use of E-PORTS platform. This includes, without limitation,
              direct loss, loss of business or profits( whether or not the loss of such profits was foreseeable, arose on the normal course of things
              or you have advised E-PORTS of the possibility of such potential loss), damage caused to your computer, computer software, system and
              programs and the data thereon or any direct or indirect, consequential and incidental damages.
            </li>
            <li>
              excludes guarantee for accuracy, currency and completeness of any information on E-PORTS.
              However, While we use reasonable care to ensure that any information, at the time it is added to E-PORTS platform,
              is accurate and current.
            </li>
          </p>
          <h4 style={styles.h4}>Register and Security</h4>
          <p style={styles.p}>
            In consideration of your use of E-PORTS platform, you agree to:
            <li>
              provide accurate, current and complete information about you as may be prompted by any registration forms on E-PORTS
            </li>
            <li>
              maintain and promptly update your information, and any other information you provide to E-PORTS, to keep it accurate,
              current and complete;
            </li>
            <li>
              maintain the security of your password and identification;
            </li>
            <li>
              ensure that you exit from your account at the end of operation;
            </li>
            <li>
              notify E-PORTS immediately of any unauthorized use of your account or other breach of security;
            </li>
            <li>
              accept all responsibility for any and all activities that occur under your account; and
            </li>
            <li>
              accept all responsibility for any and all activities that occur under your account; and
            </li>
          </p>
          <h4 style={styles.h4}>Rules of Conduct</h4>
          <p style={styles.p}>
            You agree that you will not use E-PORTS platform for any purpose that is unlawful or not permitted by this terms and conditions.
            By way of example, and not as a limitation, you agree that when communicating via E-PORTS platform, you shall not do any of the
            following:
            <li>
              Defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of privacy) of others.
            </li>
            <li>
              Publish, post, distribute or disseminate any defamatory, infringing, obscene, pornographic, sexual, indecent or unlawful material
              or information.
            </li>
            <li>
              Upload or otherwise transfer files that contain viruses, corrupted files or any other similar software or programs that may
              damage or inhibit the operation of another computer.
            </li>
            <li>
              Advertise or offer to sell any goods or services or conduct or forward surveys, contests or chain letters.
            </li>
            <li>
              Download any file posted by another user of a Forum that you know, or reasonably should know, cannot be legally distributed in such
              manner.
            </li>
            <li>
              Use any communications or Licensed Content or other information obtained through E-PORTS platform in a manner that is competitive
              with E-PORTS plarform or E-PORTS’s business.
            </li>
          </p>
          <p style={styles.p}>
            You acknowledge that Forums and Comments Threads are public and not private communications. Further, you acknowledge that
            no communication of a third party is endorsed by E-PORTS and no communication of a third party may be considered reviewed,
            screened or approved by E-PORTS. As explained below, E-PORTS reserves the right for any reason to remove without notice
            any communication or other material posted to E-PORTS platform.
          </p>
          <p style={styles.p}>
            You also agree not to use E-PORTS platform in any manner that could damage, disable, overburden, or impair E-PORTS or interfere with
            any other party's use and enjoyment of E-PORTS platform. You also agree not to attempt to gain unauthorized access to any
            E-PORTS user accounts, computer systems or networks associated with E-PORTS platform. You also agree not to obtain or attempt
            to obtain any materials or information through any means not intentionally made available or provided for through E-PORTS platform.
          </p>
          <h4 style={styles.h4}>Managing Content</h4>
          <p style={styles.p}>
            E-PORTS does not and cannot review all communications uploaded to E-PORTS platform, and is not responsible for the content
            of such communications. E-PORTS reserves the right to delete, move or edit any communication that it may determine,
            in its sole discretion, violates or may violate this terms and conditions or is otherwise unacceptable.
            You shall remain solely responsible for all communications made under your account.
          </p>
          <h4 style={styles.h4}>Confidential Information</h4>
          <p style={styles.p}>
            This terms and conditions is effective until terminated. You may terminate this terms and conditions at any time by notification
            acceptable to E-PORTS which enables confirmation of your identity and your intention to terminate. E-PORTS reserves the right,
            in its sole discretion, to restrict, suspend or terminate your right to access the account of E-PORTS at any time for any
            reason without prior notice or liability. E-PORTS may change, suspend or discontinue all or any aspect of E-PORTS platform
            at any time, including the availability of any feature, database, or Content, without prior notice or liability.
          </p>
          <p style={styles.p}>
            E-PORTS may also terminate or suspend your access to your account of E-PORTS for inactivity, which is defined as failing
            to access your account for an extended period of time, as reasonably determined by E-PORTS.
          </p>
          <h4 style={styles.h4}>Cookies</h4>
          <p style={styles.p}>
            We may use “HTTP cookies” to identify you, personalize your experience, and track your movement while you browse
            E-PORTS platform; to control your access to our content; to support the features of E-PORTS platform;
            to process any request you may have; and to improve the quality of our content and services.
          </p>
          <h4 style={styles.h4}>Links</h4>
          <p style={styles.p}>
            We may provide links to third-party websites as a service to you, but this terms and conditions of use only applies to
            E-PORTS platform. We assume no responsibility for the content of these third-party websites to which our platform has links.
            We do not have control of such websites and linking to these websites does not mean that we warrant, endorse, recommend or
            sponsor the content found on these websites. In other words, we will not be responsible or be liable for your use of the
            content on these websites, so if you decide to access any such linked websites, you do so at your own risk.
          </p>
          <h4 style={styles.h4}>Age and Responsibility</h4>
          <p style={styles.p}>
             You represent and warrant that you are of sufficient legal age to use E-PORTS platform and to create binding legal obligations
             for any liability you may incur as a result of the use of E-PORTS platform. You agree to be responsible for all of your use of
             E-PORTS platform (as well as for use of your username and password(s) by others, including without limitation, minors
             living with you). You agree to supervise all usage by minors of E-PORTS platform under your name or account.
          </p>
          <h4 style={styles.h4}>Intellectual Property</h4>
          <p style={styles.p}>
             The content of E-PORTS platform is the intellectual property of E-PORTS. You may download any content for your personal or
             non-commercial use within your organization. You may not modify, copy, distribute, transmit, perform, display, prepare
             derivative works from, transfer, sell, exploit or otherwise use any content of E-PORTS without our prior written permission. 
          </p>
          <p style={styles.p}>
             All brand names, service marks or trademarks associated with E-PORTS (whether registered or unregistered) are proprietary to
             E-PORTS, its affiliates and/or its licensors and are protected by all applicable intellectual property laws.
             Any unauthorized use is strictly prohibited.
          </p>
          <h4 style={styles.h4}>Notification of Changes</h4>
          <p style={styles.p}>
             E-PORTS reserves the right to change this terms and conditions from time to time as it sees fit and your continued use of the
             site will signify your acceptance of any adjustment to this terms and conditions.
          </p>
          <h4 style={styles.h4}>Communications</h4>
          <p style={styles.p}>
             We have an email address for your different questions, which can be found on the bottom of the website
             <a href='mailto:contact@e-ports.com'> contact@e-ports.com</a>
          </p>
        </div>
      </div>
    );
  }

}
