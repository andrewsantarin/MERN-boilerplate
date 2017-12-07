import React from 'react';
import { render } from 'react-dom';

import test from './test';
import Root from './Root';

test();

render(<Root />, document.getElementById('root'));
