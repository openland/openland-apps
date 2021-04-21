import Bugsnag from "@bugsnag/react-native";
Bugsnag.start({ enabledReleaseStages: ['production', 'staging'] });
// Bugsnag.start();

import 'react-native-gesture-handler'
import * as App from './build/native/openland-mobile';
export default App;