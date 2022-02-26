import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';

export class Artifact implements SelectableItem {
  public constructor(
    public readonly name: string
  ) {
  }

  getName(): string {
    return this.name;
  }
}

export const ARTIFACTS_ALL = [
  new Artifact('artifact.amulet-air'),
  new Artifact('artifact.amulet-earth'),
  new Artifact('artifact.amulet-fire'),
  new Artifact('artifact.amulet-water'),
  new Artifact('artifact.balance-trades'),
  new Artifact('artifact.boots-speed'),
  new Artifact('artifact.case-knowledge'),
  new Artifact('artifact.golden-chest'),
  new Artifact('artifact.grimoire'),
  new Artifact('artifact.holy-staff'),
  new Artifact('artifact.mirror-wisdom'),
  new Artifact('artifact.orb-power'),
  new Artifact('artifact.pendant-strength'),
  new Artifact('artifact.ring-protection')
];
