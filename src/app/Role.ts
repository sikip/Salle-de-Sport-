import { ERole } from './ERole';

export class Role {
  id: number;
  name: ERole;

  constructor(id: number, name: ERole) {
    this.id = id;
    this.name = name;
  }
}
