import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object,
        enableScript: PropTypes.bool,
    };

    static defaultProps ={
        enableScript : true
    };

    render() {
        const {assets, component, store} = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';
        const head = Helmet.rewind();
        return (
            <html lang="en-us" style={{margin: 0, height: '100%'}}>
            <head>
                {head && head.base.toComponent()}
                {head && head.title.toComponent()}
                {head && head.meta.toComponent()}
                {head && head.link.toComponent()}
                {head && head.script.toComponent()}

              <link rel="shortcut icon" href="/favicon.ico" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* styles (will be present only in production with webpack extract text plugin) */}
                {Object.keys(assets.styles).map((style, key) =>
                    <link href={assets.styles[style]} key={key} media="screen, projection"
                          rel="stylesheet" type="text/css" charSet="UTF-8"/>
                )}
              <script dangerouslySetInnerHTML={{__html: `window.__API_URI=${'"'+__EP_PUBLIC_API_URL__+'"'}`}} charSet="UTF-8"/>
            </head>
            <body style ={{margin: 0, fontFamily:'Roboto', height: '100%'}}>
            <div style ={{margin: 0, height: '100%'}} id="content" dangerouslySetInnerHTML={{__html: content}}/>
            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
            {this.props.enableScript ? <script src={assets.javascript.main} charSet="UTF-8"/> : null}
            </body>
            </html>
        );
    }
}
