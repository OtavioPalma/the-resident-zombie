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
  const [trade, setTrade] = useState({
    survivorOne: null,
    tradeOne: [],
    survivorTwo: null,
    tradeTwo: [],
  });

  /* Redux Selectors */
  const survivorLoading = useSelector(state => state.survivor.loading);
  const survivorError = useSelector(state => state.survivor.error);
  const survivors = useSelector(state => state.survivor.survivors);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchSurvivors = () => dispatch(actions.fetchSurvivors());
  const onTradeItems = (survivorId, consumerId, payment, pick) =>
    dispatch(
      actions.tradeItems({ survivorId, trade: { consumerId, payment, pick } }),
    );

  useEffect(() => {
    onFetchSurvivors();
  }, []);

  const handleTrade = (survivor, number) => {
    setTrade({
      ...trade,
      [`survivor${number}`]: survivor,
      [`trade${number}`]: survivor.inventory.map(() => ({
        amount: 0,
      })),
    });
  };

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

  const handleValue = number => {
    let points = [14, 12, 10, 8];

    return trade[`trade${number}`].reduce(
      (prevValue, nextValue, index) =>
        prevValue + nextValue.amount * points[index],
      0,
    );
  };

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

      {survivorError && (
        <Toast message={`Survivor Error: ${survivorError}`} type="error" />
      )}

      {survivorLoading && <Spinner />}

      {!survivorLoading && survivors && (
        <Card grid="1fr 1fr">
          <div>
            <span> Survivor One </span>

            {!trade.survivorOne ? (
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
            )}
          </div>

          {trade.survivorOne && (
            <div>
              <span> Survivor Two </span>

              {!trade.survivorTwo ? (
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
              )}

              <Button
                content="Trade"
                status={
                  survivorLoading || handleValue('One') !== handleValue('Two')
                }
                handleClick={handleSubmit}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
