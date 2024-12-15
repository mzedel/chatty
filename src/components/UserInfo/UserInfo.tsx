import { FunctionComponent } from 'react';

import './userInfo.css';

interface Props {
  user: string;
  title?: string;
}

export const UserInfo: FunctionComponent<Props> = ({ user, title }) => (
  <div className="user vertically-centered">
    <div className="image-container">
      <img src={`https://eu.ui-avatars.com/api/?name=${title || user}&size=200`} />
    </div>
    {title || user}
  </div>
);
