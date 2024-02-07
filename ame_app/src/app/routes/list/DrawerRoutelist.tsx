type DrawerListType = {
  label: string;
  icon: string;
  action: string;
};

const globalDrawerLIst: DrawerListType[] = [
  {
    label: 'Perfil',
    icon: 'person-outline',
    action: 'UserProfile',
  },

  {
    label: 'Configuración',
    icon: 'settings-outline',
    action: 'Settings',
  },
  {
    label: 'Acerca de',
    icon: 'information-circle-outline',
    action: 'AboutTheApp',
  },
];

export const userDrawerLIst: DrawerListType[] = [
  {
    label: 'Inicio',
    icon: 'home-outline',
    action: 'Home',
  },
  {
    label: 'Solicitar servicio',
    icon: 'hand-right-outline',
    action: 'RequestService',
  },

  {
    label: 'Acudientes',
    icon: 'people-outline',
    action: 'AcudientesList',
  },
  ...globalDrawerLIst,
];

export const deliveryDrawerLIst: DrawerListType[] = [
  {
    label: 'Inicio',
    icon: 'home-outline',
    action: 'Home',
  },
  ...globalDrawerLIst,
];
