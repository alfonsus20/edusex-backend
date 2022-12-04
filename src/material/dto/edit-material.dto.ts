import { PartialType } from '@nestjs/mapped-types';
import { Material } from '../../models';

export class EditMaterialDto extends PartialType(Material) {}
