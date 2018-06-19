import { graphqlCompose5 } from 'openland-x-graphql/graphqlCompose';
import { withCreateFolderMutation } from './withCreateFolderMutation';
import { withDeleteFolderMutation } from './withDeleteFolderMutation';
import { withAlterFolderMutation } from './withAlterFolderMutation';
import { withSetFolderMutation } from './withSetFolderMutation';
import { withAddToFolderMutation } from './withAddToFolderMutation';

export const withFolderActions = graphqlCompose5(withCreateFolderMutation, withDeleteFolderMutation, withAlterFolderMutation, withAddToFolderMutation, withSetFolderMutation);