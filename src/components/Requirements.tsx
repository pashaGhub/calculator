import React from 'react';

export const Requirements: React.FC = () => {
  return (
    <div className='requirements'>
      <h3>Calculator's name:</h3>
      <input value='Fix me!' />

      <ul>
        <li>
          It <strong>must</strong> be possible to perform basic calculations (+ - * /) with floating-point numbers
        </li>
        <li>
          It <strong>must</strong> be possible to update calculator's name live
        </li>
        <li>
          Calculator's state <strong>must</strong> be reset, when it's name is changed
        </li>
        <br />
        <li>
          Every calculator button <strong>should</strong> be <em>mapped</em> from <code>characters</code> array and render it's symbol using <em>children</em>
        </li>
        <li>
          Every calculator button <strong>should</strong> have <em>lightgray</em> color and <em>pointer</em> cursor when hovered; <em>gray</em> color when active
        </li>
        <br />
        <li>
          <strong>Would be nice</strong> if you used React <em>hooks</em> and <em>Functional Components</em>
        </li>
        <li>
          <strong>Would be nice</strong> to have typescript interfaces for all <em>props</em> and typescript type for <em>CalculationActions</em>
        </li>
        <li>
          <strong>Would be nice</strong> to have scss syntax used for styling
        </li>
        <br />
        <li>P.S. You are free to refactor existing code, change the design or add any new features! And remember - quality over quantity! Good luck :)</li>
      </ul>
    </div>
  );
};
