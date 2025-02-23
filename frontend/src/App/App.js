import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { Provider } from 'react-redux';
import PageConnector from 'Components/Page/PageConnector';
import ApplyTheme from './ApplyTheme';
import AppRoutes from './AppRoutes';

function App({ store, history, hasTranslationsError }) {
  return (
    <DocumentTitle title={window.Lidarr.instanceName}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ApplyTheme>
            <PageConnector hasTranslationsError={hasTranslationsError}>
              <AppRoutes app={App} />
            </PageConnector>
          </ApplyTheme>
        </ConnectedRouter>
      </Provider>
    </DocumentTitle>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  hasTranslationsError: PropTypes.bool.isRequired
};

export default App;
