import React from 'react';
import classNames from 'classnames';
import { FormGroup, TextArea } from '@blueprintjs/core';
import { FormattedMessage as T } from 'react-intl';
import { Row, Col } from 'components';
import { CLASSES } from 'common/classes';

/**
 * Payment receive form footer.
 */
export default function PaymentReceiveFormFooter({
  getFieldProps,
}) {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <Row>
        <Col md={8}>
          {/* --------- Statement --------- */}
          <FormGroup
            label={<T id={'statement'} />}
            className={'form-group--statement'}
          >
            <TextArea
              growVertically={true}
              {...getFieldProps('description')}
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
}