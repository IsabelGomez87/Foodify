/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PopupInfo from './index';
import { screen, render } from '../../utils/test-utils';

describe('PopupInfo component', () => {
  test('should contain a dataTestId', () => {
    render(<PopupInfo />);
    expect(screen.getByTestId(/popupinfo-container/i)).toBeInTheDocument();
  });
});
