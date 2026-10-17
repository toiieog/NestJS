import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  // 1. GET /products: Lấy danh sách tất cả sản phẩm
  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  // 2. GET /products/:id: Lấy chi tiết 1 sản phẩm
  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có ID = ${id}`);
    }
    return product;
  }

  // 3. POST /products: Thêm sản phẩm mới
  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(dto);
    return await this.productRepository.save(newProduct);
  }

  // 4. PUT /products/:id: Cập nhật thông tin sản phẩm
  async update(id: number, dto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return await this.productRepository.save(product);
  }

  // 5. DELETE /products/:id: Xóa sản phẩm
  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: `Đã xóa thành công sản phẩm có ID = ${id}` };
  }
}