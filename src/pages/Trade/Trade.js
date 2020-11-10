import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Trade.module.scss';
import * as actions from '../../store/actions/index';

import { Toast } from '../../shared/Toast/Toast';
import { Spinner } from '../../shared/Spinner/Spinner';
import { Header } from '../../components/UI/Header/Header';
import { Card } from '../../components/UI/Card/Card';
import { Button } from '../../components/UI/Button/Button';
import { SurvivorsList } from '../../components/SurvivorsList/SurvivorsList';
import { TextField } from '../../components/UI/TextField/TextField';
import { ItemsList } from '../../components/ItemsList/ItemsList';

export const Trade = () => {
  /* Local State */
  const [trade, setTrade] = useState({
    survivorOne: null,
    tradeOne: [],
    survivorTwo: null,
    tradeTwo: [],
  });

  /* Redux Selectors */
  const loading = useSelector(state => state.survivor.loading);
  const error = useSelector(state => state.survivor.error);
  const survivors = useSelector(state => state.survivor.survivors);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchSurvivors = () => dispatch(actions.fetchSurvivors());
  const onTradeItems = (survivorId, consumerId, payment, pick) =>
    dispatch(
      actions.tradeItems({ survivorId, trade: { consumerId, payment, pick } }),
    );

  /**
   * Fetches the list of survivors on page load
   */
  useEffect(() => {
    onFetchSurvivors();
  }, []);

  /**
   * Initializes the survivor inventory (survivor${number}) and survivor
   * offer (trade${number}) when a survivor is selected from the first list
   * @param  {Survivor} survivor The selected survivor from the first list
   * @param  {String} number The survivor number (One or Two)
   */
  const handleTrade = (survivor, number) => {
    setTrade({
      ...trade,
      [`survivor${number}`]: survivor,
      [`trade${number}`]: survivor.inventory.map(() => ({ amount: 0 })),
    });
  };

  /**
   * First we get a copy of the survivor inventory and offer, then we check if
   * it is a add or remove situation, if add we increase the amount in the offer
   * and decrease in the inventory, otherwise increase the amount in the
   * inventory and decrease in the offer, then we set the local state with the
   * made changes
   * @param  {Number} index The item index
   * @param  {String} type The action (add or remove)
   * @param  {String} number The survivor number (One or Two)
   */
  const handleTradeItems = (index, type, number) => {
    const tradeItemsCopy = [...trade[`trade${number}`]];
    const survivorItemsCopy = [...trade[`survivor${number}`].inventory];

    switch (type) {
      case 'add':
        if (survivorItemsCopy[index].amount > 0) {
          survivorItemsCopy[index] = {
            ...survivorItemsCopy[index],
            amount: survivorItemsCopy[index].amount - 1,
          };

          tradeItemsCopy[index] = {
            ...tradeItemsCopy[index],
            amount: tradeItemsCopy[index].amount + 1,
          };
        }
        break;
      case 'remove':
        if (tradeItemsCopy[index].amount > 0) {
          survivorItemsCopy[index] = {
            ...survivorItemsCopy[index],
            amount: survivorItemsCopy[index].amount + 1,
          };

          tradeItemsCopy[index] = {
            ...tradeItemsCopy[index],
            amount: tradeItemsCopy[index].amount - 1,
          };
        }
        break;
      default:
        return;
    }

    setTrade({
      ...trade,
      [`survivor${number}`]: {
        ...trade[`survivor${number}`],
        inventory: [...survivorItemsCopy],
      },
      [`trade${number}`]: [...tradeItemsCopy],
    });
  };

  /**
   * Sum of the selected items in a survivor offer
   * @param  {String} number The survivor number (One or Two)
   */
  const handleValue = number => {
    let points = [14, 12, 10, 8];

    return trade[`trade${number}`].reduce(
      (prevValue, nextValue, index) =>
        prevValue + nextValue.amount * points[index],
      0,
    );
  };

  /**
   * If both offers have the same value in points we proceed to make the trade
   * request, then we reset our local state
   */
  const handleSubmit = () => {
    if (handleValue('One') === handleValue('Two')) {
      const survivorOne = trade.tradeOne.map(item => item.amount);
      const survivorTwo = trade.tradeTwo.map(item => item.amount);

      onTradeItems(
        trade.survivorOne._id,
        trade.survivorTwo._id,
        survivorOne,
        survivorTwo,
      );

      setTrade({
        survivorOne: null,
        tradeOne: [],
        survivorTwo: null,
        tradeTwo: [],
      });
    }
  };

  return (
    <div className="container">
      <Header>
        <span>Trade your Items</span>

        <span>
          Help us maintain the economic flow, trade with other survivors!
          (values must match so the trade is valid)
        </span>
      </Header>

      {
        //If something went wrong with any request we show the user a friendly toast
        error && <Toast message={`Survivor Error: ${error}`} type="error" />
      }

      {
        // While fetching our async data show the user a friendly spinner
        loading && <Spinner />
      }

      {
        // After the loading show the content with the fetched data
        !loading && survivors && (
          <Card grid="1fr 1fr">
            <div>
              <span> Survivor One </span>

              {
                // Shows the survivor list while no survivor is selected
                // After select show the survivor inventory
                !trade.survivorOne ? (
                  <SurvivorsList
                    survivors={survivors}
                    handleClick={survivor => handleTrade(survivor, 'One')}
                  />
                ) : (
                  <Fragment>
                    <TextField>
                      {trade.survivorOne.name}, {trade.survivorOne.age}
                    </TextField>

                    <div className={classes.trade}>
                      <div className={classes.trade_items}>
                        <ItemsList
                          title={'Inventory'}
                          inventory={trade.survivorOne.inventory}
                          handleClick={index =>
                            handleTradeItems(index, 'add', 'One')
                          }
                        />

                        <ItemsList
                          title={'Trade'}
                          inventory={trade.tradeOne}
                          handleClick={index =>
                            handleTradeItems(index, 'remove', 'One')
                          }
                        />
                      </div>

                      <div className={classes.trade_value}>
                        <TextField>
                          <span>Value: {handleValue('One')}</span>
                        </TextField>
                      </div>
                    </div>
                  </Fragment>
                )
              }
            </div>

            {
              // Only show the second survivor list after the first one is selected
              trade.survivorOne && (
                <div>
                  <span> Survivor Two </span>

                  {
                    // Shows the second survivor list while no survivor is selected
                    // After select show the second survivor inventory
                    !trade.survivorTwo ? (
                      <SurvivorsList
                        survivors={survivors.filter(
                          surv => surv._id !== trade.survivorOne._id,
                        )}
                        handleClick={survivor => handleTrade(survivor, 'Two')}
                      />
                    ) : (
                      <Fragment>
                        <TextField>
                          {trade.survivorTwo.name}, {trade.survivorTwo.age}
                        </TextField>

                        <div className={classes.trade}>
                          <div className={classes.trade_items}>
                            <ItemsList
                              title={'Trade'}
                              inventory={trade.tradeTwo}
                              handleClick={index =>
                                handleTradeItems(index, 'remove', 'Two')
                              }
                            />

                            <ItemsList
                              title={'Inventory'}
                              inventory={trade.survivorTwo.inventory}
                              handleClick={index =>
                                handleTradeItems(index, 'add', 'Two')
                              }
                            />
                          </div>

                          <div className={classes.trade_value}>
                            <TextField>
                              <span>Value: {handleValue('Two')}</span>
                            </TextField>
                          </div>
                        </div>
                      </Fragment>
                    )
                  }

                  <Button
                    content="Trade"
                    status={
                      //Disables button if any async actions or trade values don't match
                      loading || handleValue('One') !== handleValue('Two')
                    }
                    handleClick={handleSubmit}
                  />
                </div>
              )
            }
          </Card>
        )
      }
    </div>
  );
};
