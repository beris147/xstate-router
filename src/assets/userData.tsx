export type UserT = {
  id: string;
  displayName: string;
  email: string;
};

const USERS_DATA: Array<UserT> = [
  {
    id: '1',
    displayName: 'Edgar Beristain',
    email: 'edgar@beristain.com',
  },
  {
    id: '2',
    displayName: 'Eduardo Urrea',
    email: 'eduardo@urrea.com',
  },
  {
    id: '3',
    displayName: 'Adrian Beristain',
    email: 'adrian@beristain.com',
  },
];

export default USERS_DATA;
