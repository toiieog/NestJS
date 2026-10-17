import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop Dell XPS 15', description: 'Tên sản phẩm' })
  name: string;

  @ApiPropertyOptional({ example: 'Laptop cao cấp mỏng nhẹ', description: 'Mô tả' })
  description?: string;

  @ApiProperty({ example: 25000000, description: 'Giá sản phẩm' })
  price: number;

  @ApiProperty({ example: 10, description: 'Số lượng kho' })
  quantity: number;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Laptop Dell XPS 15 (2026)', description: 'Tên sản phẩm' })
  name?: string;

  @ApiPropertyOptional({ example: 'Mô tả đã cập nhật', description: 'Mô tả' })
  description?: string;

  @ApiPropertyOptional({ example: 24000000, description: 'Giá sản phẩm' })
  price?: number;

  @ApiPropertyOptional({ example: 15, description: 'Số lượng kho' })
  quantity?: number;
}