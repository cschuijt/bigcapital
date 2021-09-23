import React from 'react';
import {
  NavbarGroup,
  NavbarDivider,
  Button,
  Classes,
  Intent,
  Switch,
  Alignment,
} from '@blueprintjs/core';

import DashboardActionsBar from 'components/Dashboard/DashboardActionsBar';
import Icon from 'components/Icon';
import {
  If,
  FormattedMessage as T,
  DashboardActionViewsList,
  DashboardFilterButton,
  DashboardRowsHeightButton,
  AdvancedFilterPopover,
} from 'components';

import { useRefreshVendors } from 'hooks/query/vendors';
import { useVendorsListContext } from './VendorsListProvider';
import { useHistory } from 'react-router-dom';

import withVendorsActions from './withVendorsActions';
import withVendors from './withVendors';

import withSettingsActions from '../../Settings/withSettingsActions';
import withSettings from '../../Settings/withSettings';

import { compose } from 'utils';

/**
 * Vendors actions bar.
 */
function VendorActionsBar({
  // #withVendors
  vendorsFilterConditions,

  // #withVendorActions
  setVendorsTableState,
  vendorsInactiveMode,

  // #withSettings
  vendorsTableSize,

  // #withSettingsActions
  addSetting,
}) {
  const history = useHistory();

  // Vendors list context.
  const { vendorsViews, fields } = useVendorsListContext();

  // Handles new vendor button click.
  const onClickNewVendor = () => {
    history.push('/vendors/new');
  };

  // Vendors refresh action.
  const { refresh } = useRefreshVendors();

  // Handle the active tab change.
  const handleTabChange = (viewSlug) => {
    setVendorsTableState({ viewSlug });
  };

  // Handle inactive switch changing.
  const handleInactiveSwitchChange = (event) => {
    const checked = event.target.checked;
    setVendorsTableState({ inactiveMode: checked });
  };

  // Handle click a refresh sale estimates
  const handleRefreshBtnClick = () => {
    refresh();
  };

  const handleTableRowSizeChange = (size) => {
    addSetting('vendor', 'tableSize', size);
  };
  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <DashboardActionViewsList
          resourceName={'vendors'}
          views={vendorsViews}
          onChange={handleTabChange}
        />
        <NavbarDivider />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'plus'} />}
          text={<T id={'new_vendor'} />}
          onClick={onClickNewVendor}
        />
        <NavbarDivider />
        <AdvancedFilterPopover
          advancedFilterProps={{
            conditions: vendorsFilterConditions,
            defaultFieldKey: 'display_name',
            fields: fields,
            onFilterChange: (filterConditions) => {
              setVendorsTableState({ filterRoles: filterConditions });
            },
          }}
        >
          <DashboardFilterButton
            conditionsCount={vendorsFilterConditions.length}
          />
        </AdvancedFilterPopover>

        <If condition={false}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="trash-16" iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
          />
        </If>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-import-16" iconSize={16} />}
          text={<T id={'import'} />}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-export-16" iconSize={16} />}
          text={<T id={'export'} />}
        />
        <NavbarDivider />
        <DashboardRowsHeightButton
          initialValue={vendorsTableSize}
          onChange={handleTableRowSizeChange}
        />
        <NavbarDivider />
        <Switch
          labelElement={<T id={'inactive'} />}
          defaultChecked={vendorsInactiveMode}
          onChange={handleInactiveSwitchChange}
        />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="refresh-16" iconSize={14} />}
          onClick={handleRefreshBtnClick}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(
  withVendorsActions,
  withSettingsActions,
  withVendors(({ vendorsTableState }) => ({
    vendorsInactiveMode: vendorsTableState.inactiveMode,
    vendorsFilterConditions: vendorsTableState.filterRoles,
  })),
  // withSettings(({  }) => ({
  //   vendorsTableSize:
  // })),
)(VendorActionsBar);
