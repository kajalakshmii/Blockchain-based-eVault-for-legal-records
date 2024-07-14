// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock ethers and window.ethereum for testing
jest.mock('ethers', () => ({
  ...jest.requireActual('ethers'),
  providers: {
    Web3Provider: jest.fn().mockImplementation(() => ({
      send: jest.fn(),
      getSigner: jest.fn().mockReturnValue({
        getAddress: jest.fn().mockResolvedValue('0x123456789...')
      }),
      on: jest.fn()
    }))
  }
}));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
