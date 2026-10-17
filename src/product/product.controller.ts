import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Đường dẫn tới JwtAuthGuard đã làm ở Lab 2

@ApiTags('Products')
@ApiBearerAuth() // Đăng ký xác thực Bearer Token trên Swagger cho nhóm API này
@UseGuards(JwtAuthGuard) // Bảo vệ toàn bộ Controller bằng JWT Guard
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả sản phẩm' })
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin chi tiết một sản phẩm theo ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Thêm một sản phẩm mới' })
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm theo ID' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProductDto,
    ) {
        return this.productService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa một sản phẩm theo ID' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productService.remove(id);
    }
}