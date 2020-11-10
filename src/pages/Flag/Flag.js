import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Flag.module.scss';
import * as actions from '../../store/actions/index';

import { Spinner } from '../../shared/Spinner/Spinner';
import { Toast } from '../../shared/Toast/Toast';
import { Header } from '../../components/UI/Header/Header';
import { Card } from '../../components/UI/Card/Card';
import { SurvivorsList } from '../../components/SurvivorsList/SurvivorsList';
import { Button } from '../../components/UI/Button/Button';
import { TextField } from '../../components/UI/TextField/TextField';
import { Modal } from '../../components/UI/Modal/Modal';

export const Flag = () => {
  /* Local State */
  const [report, setReport] = useState({ witness: null, suspect: null });

  /* Constants and Variables */
  const { witness } = report;

  /* Redux Selectors */
  const survivorLoading = useSelector(state => state.survivor.loading);
  const survivorError = useSelector(state => state.survivor.error);
  const survivors = useSelector(state => state.survivor.survivors);
  const suspect = useSelector(state => state.flag.suspect);
  const reports = useSelector(state => state.flag.reports);
  const flagLoading = useSelector(state => state.flag.loading);
  const flagError = useSelector(state => state.flag.error);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchSurvivors = () => dispatch(actions.fetchSurvivors());
  const onFlagSurvivor = (witness, suspect) =>
    dispatch(actions.flagSurvivor({ witness, suspect }));
  const onFlagSurvivorReset = () => dispatch(actions.flagSurvivorReset());
  const onFetchSurvivorReports = witness =>
    dispatch(actions.fetchSurvivorReports({ witness }));

  /**
   * Fetches the list of survivors on page load
   */
  useEffect(() => {
    onFetchSurvivors();
  }, []);

  /**
   * Fetches the reportings list of the selected survivor so it can't report
   * the same survivor again (runs every time a different survivor is selected)
   */
  useEffect(() => {
    if (witness) {
      onFetchSurvivorReports(witness);
    }
  }, [witness]);

  /**
   * Sets the selected survivor as a witness to report someone (we always reset
   * the suspect when the user changes the selected survivor)
   * @param  {Survivor} survivor The selected survivor from the first list
   */
  const handleWitness = survivor => {
    setReport({ witness: survivor, suspect: null });
  };

  /**
   * Sets the selected survivor as a suspect of the report
   * @param  {Survivor} survivor The selected survivor from the second list
   */
  const handleSuspect = survivor => {
    setReport({ ...report, suspect: survivor });
  };

  /**
   * If the user selected a witness and a suspect we proceed to call the method
   * to dispatch the request to our API, then, we reset our local state
   */
  const handleSubmit = () => {
    if (report.witness && report.suspect) {
      onFlagSurvivor(report.witness, report.suspect);
      setReport({ witness: null, suspect: null });
    }
  };

  /**
   * Resets the local state and updates our survivors list after a survivor is
   * considered infected
   */
  const handleResetSuspect = () => {
    onFlagSurvivorReset();
    onFetchSurvivors();
  };

  return (
    <div className="container">
      <Header>
        <span>Flag a Survivor as Infected</span>

        <span>Don't hesitate if you think any survivor is infected!</span>
      </Header>

      {
        /**
         * If something went wrong with the reporting we show the user a
         * friendly toast
         */
        flagError && (
          <Toast message={`Flag Error: ${survivorError}`} type="error" />
        )
      }

      {
        /**
         * If something went wrong with the survivors list we show the user
         * a friendly toast
         */
        survivorError && (
          <Toast message={`Survivor Error: ${survivorError}`} type="error" />
        )
      }

      {
        /**
         * After a reporting if the reported survivor hits the count of five
         * reports we notify the user
         */
        suspect?.infection >= 5 && (
          <Modal
            title="Survivor Infected!"
            description={`${suspect?.name} is now a ZOMBIE!`}
            handleClick={handleResetSuspect}
            show={suspect?.infection >= 5}
          />
        )
      }

      {
        /**
         * While fetching our async data show the user a friendly spinner
         */
        (survivorLoading || flagLoading) && <Spinner />
      }

      {
        /**
         * After the loading show the content with the fetched data
         */
        !survivorLoading && !flagLoading && survivors && (
          <Card grid="1fr 1fr 1fr">
            <div>
              <span> Survivors List </span>

              <SurvivorsList
                survivors={survivors}
                survivor={report.witness}
                handleClick={handleWitness}
              />
            </div>

            {
              /**
               * Only shows the second list if the user selected a survivor
               * on the first one (and it's reports were fetched)
               */
              report.witness && reports && (
                <div>
                  <span> Select a Suspect </span>

                  <SurvivorsList
                    /**
                     * Here we filter the second list so it doesn't show the
                     * reporting survivor name
                     */
                    survivors={survivors.filter(
                      el =>
                        !reports.includes(el._id) &&
                        el._id !== report.witness._id,
                    )}
                    survivor={report.suspect}
                    handleClick={handleSuspect}
                  />
                </div>
              )
            }

            {
              /**
               * Show a summary after both survivors are selected so the user
               * can confirm before make the report
               */
              report.witness && report.suspect && (
                <div>
                  <span> Action </span>

                  <TextField>
                    {report.witness.name}, {report.witness.age}
                  </TextField>

                  <span className={classes.card_text}>is reporting</span>

                  <TextField>
                    {report.suspect.name}, {report.suspect.age}
                  </TextField>

                  <span className={classes.card_text}>as INFECTED!</span>

                  <Button
                    content="FLAG!"
                    /**
                     * Disables the button during async actions
                     */
                    status={survivorLoading || flagLoading}
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
