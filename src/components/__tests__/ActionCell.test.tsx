import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { ThemeProvider } from 'theme/ThemeContext';

import { ActionCell } from '../ActionCell';

jest.mock('@react-native-vector-icons/ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const MockIcon = ({ name }: { name: string }) =>
    React.createElement(Text, { testID: `icon-${name}` }, name);

  return { Ionicons: MockIcon };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ActionCell', () => {
  it('renders the provided title text', () => {
    const { getByText } = renderWithProviders(
      <ActionCell title="View details" onPress={jest.fn()} />,
    );

    expect(getByText('View details')).toBeTruthy();
  });

  it('invokes onPress when tapped', () => {
    const handlePress = jest.fn();
    const { getByTestId } = renderWithProviders(
      <ActionCell title="Navigate" onPress={handlePress} />,
    );

    fireEvent.press(getByTestId('action-cell'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('supports overriding the testID for easier queries', () => {
    const { getByTestId } = renderWithProviders(
      <ActionCell title="Custom id" onPress={jest.fn()} testID="action-cell-custom" />,
    );

    expect(getByTestId('action-cell-custom')).toBeTruthy();
  });
});
