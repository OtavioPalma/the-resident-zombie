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
  const [report, setReport] = useState({ witness: null, suspect: null });

  const { witness } = report;

  /* Redux Selectors */
  const survivorLoading = useSelector(state => state.survivor.loading);
  const survivorError = useSelector(state => state.survivor.error);
  const survivors = useSelector(state => state.survivor.survivors);
  const suspect = useSelector(state => state.flag.suspect);
  const reports = useSelector(state => state.flag.reports);
  const flagLoading = useSelector(state => state.flag.loading);
  const flagError = useSelector(state => state.flag.error);
  const flagSuccess = useSelector(state => state.flag.success);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchSurvivors = () => dispatch(actions.fetchSurvivors());
  const onFlagSurvivor = (witness, suspect) =>
    dispatch(actions.flagSurvivor({ witness, suspect }));
  const onFlagSurvivorReset = () => dispatch(actions.flagSurvivorReset());
  const onFetchSurvivorReports = witness =>
    dispatch(actions.fetchSurvivorReports({ witness }));

  useEffect(() => {
    onFetchSurvivors();
  }, []);

  useEffect(() => {
    if (witness) {
      onFetchSurvivorReports(witness);
    }
  }, [witness]);

  const handleWitness = survivor => {
    setReport({ witness: survivor, suspect: null });
  };

  const handleSuspect = survivor => {
    setReport({ ...report, suspect: survivor });
  };

  const handleSubmit = () => {
    if (report.witness && report.suspect) {
      onFlagSurvivor(report.witness, report.suspect);
      setReport({ witness: null, suspect: null });
    }
  };

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

      {flagSuccess && <Toast message={'Survivor Reported!'} type="success" />}

      {flagError && (
        <Toast message={`Flag Error: ${survivorError}`} type="error" />
      )}

      {survivorError && (
        <Toast message={`Survivor Error: ${survivorError}`} type="error" />
      )}

      {suspect?.infection >= 5 && (
        <Modal
          title="Survivor Infected!"
          description={`${suspect?.name} is now a ZOMBIE!`}
          handleClick={handleResetSuspect}
          show={suspect?.infection >= 5}
        />
      )}

      {(survivorLoading || flagLoading) && <Spinner />}

      {!survivorLoading && !flagLoading && survivors && (
        <Card grid="1fr 1fr 1fr">
          <div>
            <span> Survivors List </span>

            <SurvivorsList
              survivors={survivors}
              survivor={report.witness}
              handleClick={handleWitness}
            />
          </div>

          {report.witness && reports && (
            <div>
              <span> Select a Suspect </span>

              <SurvivorsList
                survivors={survivors.filter(
                  el =>
                    !reports.includes(el._id) && el._id !== report.witness._id,
                )}
                survivor={report.suspect}
                handleClick={handleSuspect}
              />
            </div>
          )}

          {report.witness && report.suspect && (
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
                status={survivorLoading || flagLoading}
                handleClick={handleSubmit}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
