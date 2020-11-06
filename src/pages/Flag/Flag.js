import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Flag.module.scss';
import * as actions from '../../store/actions/index';

import { Spinner } from '../../components/UI/Spinner/Spinner';
import { Toast } from '../../components/UI/Toast/Toast';
import { Header } from '../../components/UI/Header/Header';
import { Card } from '../../components/UI/Card/Card';
import { SurvivorCard } from '../../components/SurvivorCard/SurvivorCard';
import { Button } from '../../components/UI/Button/Button';
import { TextField } from '../../components/UI/TextField/TextField';

export const Flag = () => {
  const [report, setReport] = useState({ witness: null, suspect: null });

  const { witness } = report;

  /* Redux Selectors */
  const survivorLoading = useSelector(state => state.survivor.loading);
  const survivorError = useSelector(state => state.survivor.error);
  const survivors = useSelector(state => state.survivor.survivors);
  const reports = useSelector(state => state.flag.reports);
  const flagLoading = useSelector(state => state.flag.loading);
  const flagError = useSelector(state => state.flag.error);
  const flagSuccess = useSelector(state => state.flag.success);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchSurvivors = () => dispatch(actions.fetchSurvivors());
  const onFlagSurvivor = (witness, suspect) =>
    dispatch(actions.flagSurvivor({ witness, suspect }));
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

      {(survivorLoading || flagLoading) && <Spinner />}

      {!survivorLoading && !flagLoading && survivors && (
        <Card grid="1fr 1fr 1fr">
          <div>
            <span> Survivors List </span>

            <div className={classes.card_list}>
              {survivors.map(survivor => (
                <SurvivorCard
                  survivor={survivor}
                  key={survivor.id}
                  handleClick={() => handleWitness(survivor)}
                />
              ))}
            </div>
          </div>

          {report.witness && (
            <div>
              <span> Select a Suspect </span>

              <div className={classes.card_list}>
                {survivors
                  .filter(survivor => !reports.includes(survivor.id))
                  .map(survivor => {
                    if (survivor.id !== report.witness.id) {
                      return (
                        <SurvivorCard
                          survivor={survivor}
                          key={survivor.id}
                          handleClick={() => handleSuspect(survivor)}
                        />
                      );
                    }
                  })}
              </div>
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
