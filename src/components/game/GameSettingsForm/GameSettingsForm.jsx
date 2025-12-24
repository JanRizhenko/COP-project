import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../common/Button/Button';
import './GameSettingsForm.css';

const GameSettingsSchema = Yup.object().shape({
    difficulty: Yup.number()
        .min(3, 'Minimum difficulty is 3 disks')
        .max(8, 'Maximum difficulty is 8 disks')
        .required('Please select difficulty level'),
    playerName: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(20, 'Name must be at most 20 characters')
        .required('Please enter your name'),
    showTimer: Yup.boolean(),
    showHints: Yup.boolean(),
    timeLimit: Yup.number()
        .min(0, 'Time limit cannot be negative')
        .integer('Time limit must be a whole number')
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value),
    maxMoves: Yup.number()
        .integer('Max moves must be a whole number')
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .test('min-moves-check', 'Max moves cannot be less than required minimum', function(value) {
            if (value === null || value === undefined) return true;
            const difficulty = this.parent.difficulty;
            const minRequired = Math.pow(2, difficulty) - 1;
            return value >= minRequired;
        })
});

const GameSettingsForm = ({ onSubmit, onCancel }) => {
    const getSavedSettings = () => {
        try {
            const saved = localStorage.getItem('gameSettings');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Error loading settings:', error);
            return null;
        }
    };

    const initialValues = getSavedSettings() || {
        difficulty: 3,
        playerName: '',
        showTimer: true,
        showHints: true,
        timeLimit: null,
        maxMoves: null
    };

    const handleSubmit = (values) => {
        try {
            localStorage.setItem('gameSettings', JSON.stringify(values));
        } catch (error) {
            console.error('Error saving settings:', error);
        }

        onSubmit(values);
    };

    const difficultyLevels = [
        { value: 3, label: 'Easy (3 disks)', minMoves: 7 },
        { value: 4, label: 'Medium (4 disks)', minMoves: 15 },
        { value: 5, label: 'Hard (5 disks)', minMoves: 31 },
        { value: 6, label: 'Expert (6 disks)', minMoves: 63 },
        { value: 7, label: 'Master (7 disks)', minMoves: 127 },
        { value: 8, label: 'Legendary (8 disks)', minMoves: 255 }
    ];

    return (
        <div className="game-settings-form">
            <Formik
                initialValues={initialValues}
                validationSchema={GameSettingsSchema}
                onSubmit={handleSubmit}
            >
                {({ values, isSubmitting }) => (
                    <Form className="settings-form">
                        <h2 className="settings-form__title">Game Settings</h2>

                        <div className="form-group">
                            <label htmlFor="playerName" className="form-label">
                                Player Name *
                            </label>
                            <Field
                                type="text"
                                id="playerName"
                                name="playerName"
                                className="form-input"
                                placeholder="Enter your name"
                            />
                            <ErrorMessage
                                name="playerName"
                                component="div"
                                className="form-error"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="difficulty" className="form-label">
                                Difficulty Level *
                            </label>
                            <Field as="select" id="difficulty" name="difficulty" className="form-select">
                                {difficultyLevels.map(level => (
                                    <option key={level.value} value={level.value}>
                                        {level.label} - Min moves: {level.minMoves}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="difficulty"
                                component="div"
                                className="form-error"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group form-group--half">
                                <label htmlFor="timeLimit" className="form-label">
                                    Time Limit (seconds)
                                </label>
                                <Field
                                    type="number"
                                    id="timeLimit"
                                    name="timeLimit"
                                    className="form-input"
                                    placeholder="No limit"
                                    min="0"
                                />
                                <ErrorMessage
                                    name="timeLimit"
                                    component="div"
                                    className="form-error"
                                />
                                <span className="form-hint">Leave empty for no time limit</span>
                            </div>

                            <div className="form-group form-group--half">
                                <label htmlFor="maxMoves" className="form-label">
                                    Max Moves
                                </label>
                                <Field
                                    type="number"
                                    id="maxMoves"
                                    name="maxMoves"
                                    className="form-input"
                                    placeholder="No limit"
                                    min={Math.pow(2, values.difficulty) - 1}
                                />
                                <ErrorMessage
                                    name="maxMoves"
                                    component="div"
                                    className="form-error"
                                />
                                <span className="form-hint">
                  Min: {Math.pow(2, values.difficulty) - 1} moves
                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-checkbox-group">
                                <label className="form-checkbox">
                                    <Field type="checkbox" name="showTimer" />
                                    <span>Show Timer</span>
                                </label>

                                <label className="form-checkbox">
                                    <Field type="checkbox" name="showHints" />
                                    <span>Show Hints</span>
                                </label>
                            </div>
                        </div>

                        <div className="settings-info">
                            <p className="settings-info__text">
                                Selected: <strong>{difficultyLevels.find(l => l.value === Number(values.difficulty))?.label}</strong>
                            </p>
                            <p className="settings-info__text">
                                Minimum moves required: <strong>{difficultyLevels.find(l => l.value === Number(values.difficulty))?.minMoves}</strong>
                            </p>
                            {values.timeLimit && (
                                <p className="settings-info__text">
                                    Time limit: <strong>{values.timeLimit} seconds</strong>
                                </p>
                            )}
                            {values.maxMoves && (
                                <p className="settings-info__text">
                                    Maximum moves: <strong>{values.maxMoves}</strong>
                                </p>
                            )}
                        </div>

                        <div className="form-actions">
                            <Button
                                type="submit"
                                variant="primary"
                                size="large"
                                disabled={isSubmitting}
                            >
                                Start Game
                            </Button>
                            {onCancel && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="large"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default GameSettingsForm;