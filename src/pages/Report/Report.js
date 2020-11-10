import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../../components/UI/Card/Card';
import { Header } from '../../components/UI/Header/Header';
import { Spinner } from '../../shared/Spinner/Spinner';
import { Toast } from '../../shared/Toast/Toast';

import classes from './Report.module.scss';
import * as actions from '../../store/actions/index';
import { Item } from '../../components/Item/Item';

import fiji_water from '../../assets/icons/fiji_water.svg';
import campbell_soup from '../../assets/icons/campbell_soup.svg';
import first_aid from '../../assets/icons/first_aid.svg';
import ak_47 from '../../assets/icons/ak_47.svg';

export const Report = () => {
  /* Redux Selectors */
  const loading = useSelector(state => state.report.loading);
  const error = useSelector(state => state.report.error);
  const infected = useSelector(state => state.report.infected);
  const nonInfected = useSelector(state => state.report.nonInfected);
  const inventory = useSelector(state => state.report.inventory);
  const points = useSelector(state => state.report.points);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchInfected = () => dispatch(actions.fetchInfected());
  const onFetchNonInfected = () => dispatch(actions.fetchNonInfected());
  const onFetchInventory = () => dispatch(actions.fetchInventory());
  const onFetchLostPoints = () => dispatch(actions.fetchLostPoints());

  /**
   * Fetches every report on page load
   */
  useEffect(() => {
    onFetchInfected();
    onFetchNonInfected();
    onFetchInventory();
    onFetchLostPoints();
  }, []);

  return (
    <div className="container">
      <Header>
        <span>Graphical Reports</span>

        <span>Stay tuned with the survivors' statistics!</span>
      </Header>

      {
        /**
         * If something went wrong with the reports fetch we show to the user a
         * friendly toast
         */
        error && <Toast message={`Error: ${error}`} type="error" />
      }

      {
        /**
         * While fetching our async data show the user a friendly spinner
         */
        loading && <Spinner />
      }

      {
        /**
         * After the loading show the content with the fetched data
         */
        !loading && infected && nonInfected && inventory && points && (
          <Card grid="1fr 1fr">
            <div>
              <span> Infected </span>
              <span className={classes.percentage}>{infected.toFixed(2)}%</span>
            </div>

            <div>
              <span> Non-Infected </span>
              <span className={classes.percentage}>
                {nonInfected.toFixed(2)}%
              </span>
            </div>

            <div>
              <span> Average Amount per Item </span>
              <div className={classes.items}>
                <div className={classes.items_item}>
                  <Item icon={fiji_water} />
                  <span className={classes.items_amount}>
                    x{inventory[0].toFixed(2)}
                  </span>
                </div>

                <div className={classes.items_item}>
                  <Item icon={campbell_soup} />
                  <span className={classes.items_amount}>
                    x{inventory[1].toFixed(2)}
                  </span>
                </div>
              </div>

              <div className={classes.items}>
                <div className={classes.items_item}>
                  <Item icon={first_aid} />
                  <span className={classes.items_amount}>
                    x{inventory[2].toFixed(2)}
                  </span>
                </div>

                <div className={classes.items_item}>
                  <Item icon={ak_47} />
                  <span className={classes.items_amount}>
                    x{inventory[3].toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span> Total Infected Points </span>
              <div className={classes.infected}>
                <span className={classes.infected_value}>{points}</span>
                <span className={classes.infected_text}>points</span>
              </div>
            </div>
          </Card>
        )
      }
    </div>
  );
};
