import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user') // Tên bảng trong MySQL của bạn
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username', length: 255 })
  username: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @Column({ name: 'token', length: 255, nullable: true })
  token: string;
}