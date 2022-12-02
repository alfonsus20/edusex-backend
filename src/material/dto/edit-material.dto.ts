import { PartialType } from '@nestjs/mapped-types';
import { Material } from '../../models';
import { CreateMaterialDto } from './create-material.dto';

export class EditMaterialDto extends PartialType(Material) {}
