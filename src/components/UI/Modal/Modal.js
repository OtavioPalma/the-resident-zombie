import React, { Fragment } from 'react';
import { Button } from '../Button/Button';

import classes from './Modal.module.scss';

export const Modal = props => {
  return (
    <Fragment>
      {props.show && (
        <div className={classes.modal}>
          <div className={classes.modal_content}>
            <span className={classes.modal_title}>{props.title}</span>
            <span className={classes.modal_description}>
              {props.description}
            </span>

            <div className={classes.modal_actions}>
              <Button content="OK" handleClick={props.handleClick} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
