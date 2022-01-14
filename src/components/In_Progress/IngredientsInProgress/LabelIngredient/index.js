import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

export default function LabelIngredient({
  e,
  inProgressRecipes,
  type,
  setInProgressRecipes,
  setCheckeds,
}) {
  const [isChecked, setChecked] = useState(false);

  const { params: { id } } = useRouteMatch();

  const testCheked = (inProgress) => {
    if (inProgress[type][id].find((ingredient) => ingredient === e)) {
      return true;
    }
    return false;
  };

  const gatInProgressRecipes = async () => {
    const getInProgress = await JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getInProgress) {
      await setInProgressRecipes(getInProgress);
    } else {
      await setInProgressRecipes({ [type]: { [id]: [] } });
    }
  };

  useEffect(() => {
    gatInProgressRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = ({ target: { value } }) => {
    if (!inProgressRecipes[type][id].find((ingredient) => ingredient === e)) {
      inProgressRecipes[type][id] = [...inProgressRecipes[type][id], value];
    } else {
      const index = inProgressRecipes[type][id].indexOf(value);
      inProgressRecipes[type][id].splice(index, 1);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setChecked(!isChecked);
    setCheckeds(inProgressRecipes[type][id].length);
  };

  return (
    !testCheked(inProgressRecipes)
      ? (
        <label htmlFor={ e }>
          <input
            type="checkbox"
            id={ e }
            name={ e }
            onChange={ handleClick }
            value={ e }
          />
          <h4 className="ingredient-name">{e}</h4>
        </label>
      )
      : (
        <label htmlFor={ e }>
          <input
            type="checkbox"
            id={ e }
            name={ e }
            onChange={ handleClick }
            value={ e }
            checked
          />
          <h4 className="ingredient-name">{e}</h4>
        </label>
      )
  );
}

LabelIngredient.propTypes = {
  e: PropTypes.string,
  inProgressRecipes: PropTypes.shape([{}]),
  type: PropTypes.string,
  setInProgressRecipes: PropTypes.func.isRequired,
  setCheckeds: PropTypes.func.isRequired,
};

LabelIngredient.defaultProps = {
  e: '',
  inProgressRecipes: [{}],
  type: '',
};
