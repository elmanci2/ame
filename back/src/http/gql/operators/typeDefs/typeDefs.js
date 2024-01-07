export const typeDefs = /* GraphQL */ `
  type Photo {
    id: String
    url: String
  }

  type Guardians {
    id: String!
    name: String!
    docType: String!
    document: String!
    date: String!
    age: Int
  }

  input GuardiansInput {
    name: String!
    docType: String!
    document: String!
    date: String!
    age: Int
  }

  type Reminders {
    id: String!
    date: String!
    message: String!
    medication: String!
    intervals: Int!
    expo_tk: String!
  }

  type Services {
    id: String!
    date: String!
    name: String!
    location: String!
    active: Boolean!
    address: String!
    eps: String
    finish: Boolean!
    photo: String
    type: Int!
  }

  type medicament {
    id: String
    date: String
    name: String
    recordatorio: Boolean
  }

  type User {
    id: String
    name: String
    lastName: String
    docType: String
    document: String!
    email: String!
    password: String
    address: String
    date: String
    country: String
    department: String
    city: String
    expo_tk: String
    phone: String!
    role: String!
    age: Int!
    onService: Boolean
    active: Boolean
    photo: Photo
    guardians: [Guardians]
    reminders: [Reminders]
    services: [Services]
    medicaments: [medicament]
  }

  input UserInput {
    name: String
    lastName: String
    docType: String
    document: String!
    email: String!
    password: String
    address: String
    date: String
    country: String
    department: String
    city: String
    expo_tk: String
    phone: String!
    role: String!
    age: Int!
    active: Boolean
  }

  type message {
    message: String
    token: String
    role: String
  }

  input CredentialsInput {
    password: String!
    email: String!
  }

  input ReminderInput {
    message: String!
    medication: String!
    intervals: Int!
  }

  type countries {
    label: String
    value: String
  }

  type states {
    label: String
    value: String
    id_country: Int
    id_state: Int
  }

  type notification {
    status: String!
    id: String
    message: String
  }

  input Service {
    type: Int
    location: String!
    active: Boolean!
    eps: String
    finish: Boolean!
  }

  #operations

  type Query {
    me: User
    login(credentials: CredentialsInput): message
    getCountries: [countries]
    getAll_bank: [countries]
    getAccountType: [countries]
    getStatesAnCountries(id: Int!, type: Int!): [states]
    getEps: [countries]
    getMedicaments: [countries]
    getServices(type: Int): [Services]
  }

  type Mutation {
    register(user: UserInput): message
    addGuardians(guardia: GuardiansInput): message
    addReminders(reminder: ReminderInput): message
    addMedicamento(name: String): message
    addService(service: Service): message
    deleteMedicamento(id: String!): message
    takeTechService(id: String!): message
    cancelTechService(id: String!): message
  }
`;
