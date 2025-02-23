import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'Components/Icon';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FilterMenu from 'Components/Menu/FilterMenu';
import PageMenuButton from 'Components/Menu/PageMenuButton';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import { align, icons, sortDirections } from 'Helpers/Props';
import translate from 'Utilities/String/translate';
import InteractiveSearchFilterModalConnector from './InteractiveSearchFilterModalConnector';
import InteractiveSearchRow from './InteractiveSearchRow';
import styles from './InteractiveSearch.css';

const columns = [
  {
    name: 'protocol',
    label: translate('Source'),
    isSortable: true,
    isVisible: true
  },
  {
    name: 'age',
    label: translate('Age'),
    isSortable: true,
    isVisible: true
  },
  {
    name: 'title',
    label: translate('Title'),
    isSortable: true,
    isVisible: true
  },
  {
    name: 'indexer',
    label: translate('Indexer'),
    isSortable: true,
    isVisible: true
  },
  {
    name: 'size',
    label: translate('Size'),
    isSortable: true,
    isVisible: true
  },
  {
    name: 'peers',
    label: translate('Peers'),
    isSortable: true,
    isVisible: true
  },
  {
    name: 'qualityWeight',
    label: translate('Quality'),
    isSortable: true,
    isVisible: true
  },
  {
    name: 'customFormatScore',
    label: React.createElement(Icon, {
      name: icons.SCORE,
      title: translate('CustomFormatScore')
    }),
    isSortable: true,
    isVisible: true
  },
  {
    name: 'rejections',
    label: React.createElement(Icon, {
      name: icons.DANGER
    }),
    isSortable: true,
    fixedSortDirection: sortDirections.ASCENDING,
    isVisible: true
  },
  {
    name: 'releaseWeight',
    label: React.createElement(Icon, { name: icons.DOWNLOAD }),
    isSortable: true,
    fixedSortDirection: sortDirections.ASCENDING,
    isVisible: true
  }
];

function InteractiveSearch(props) {
  const {
    searchPayload,
    isFetching,
    isPopulated,
    error,
    totalReleasesCount,
    items,
    selectedFilterKey,
    filters,
    customFilters,
    sortKey,
    sortDirection,
    type,
    longDateFormat,
    timeFormat,
    onSortPress,
    onFilterSelect,
    onGrabPress
  } = props;

  return (
    <div>
      <div className={styles.filterMenuContainer}>
        <FilterMenu
          alignMenu={align.RIGHT}
          selectedFilterKey={selectedFilterKey}
          filters={filters}
          customFilters={customFilters}
          buttonComponent={PageMenuButton}
          filterModalConnectorComponent={InteractiveSearchFilterModalConnector}
          filterModalConnectorComponentProps={{ type }}
          onFilterSelect={onFilterSelect}
        />
      </div>

      {
        isFetching ? <LoadingIndicator /> : null
      }

      {
        !isFetching && error ?
          <div className={styles.blankpad}>
            {translate('UnableToLoadInteractiveSearch')}
          </div> :
          null
      }

      {
        !isFetching && isPopulated && !totalReleasesCount ?
          <div className={styles.blankpad}>
            {translate('NoResults')}
          </div> :
          null
      }

      {
        !!totalReleasesCount && isPopulated && !items.length ?
          <div className={styles.blankpad}>
            {translate('AllResultsFiltered')}
          </div> :
          null
      }

      {
        isPopulated && !!items.length ?
          <Table
            columns={columns}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSortPress={onSortPress}
          >
            <TableBody>
              {
                items.map((item) => {
                  return (
                    <InteractiveSearchRow
                      key={`${item.indexerId}-${item.guid}`}
                      {...item}
                      searchPayload={searchPayload}
                      longDateFormat={longDateFormat}
                      timeFormat={timeFormat}
                      onGrabPress={onGrabPress}
                    />
                  );
                })
              }
            </TableBody>
          </Table> :
          null
      }

      {
        totalReleasesCount !== items.length && !!items.length ?
          <div className={styles.filteredMessage}>
            {translate('SomeResultsFiltered')}
          </div> :
          null
      }
    </div>
  );
}

InteractiveSearch.propTypes = {
  searchPayload: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  totalReleasesCount: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFilterKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  customFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.string,
  type: PropTypes.string.isRequired,
  longDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  onSortPress: PropTypes.func.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onGrabPress: PropTypes.func.isRequired
};

export default InteractiveSearch;
