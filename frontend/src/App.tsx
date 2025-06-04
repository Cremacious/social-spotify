import { Button } from './components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

function App() {
  return (
    <div className="bg-gray-800 text-white p-4">
      App
      <div>
        <Button>Button</Button>
      </div>
      <div>
        {' '}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default App;
