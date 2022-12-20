# ICE-TEA-API

## _Dự án trà đá nghìn tỉ_

## Tính năng

- MVC
- Authentication (JWT,Login,Logout)
- User(CRUD)

### Giải thích

#### _DTO (Data Tranfer Object)_

- Là một design pattern.
- Mục đích sử dụng chính của DTO đó là giảm số lần gọi các method giữa các tiến trình xử lý.
- Là một cấu trúc dữ liệu bằng phẳng không chứa business logic dùng để lưu trữ dữ liệu.
- Dữ liệu được ánh xạ từ domain model sang DTO và ngược lại thông qua một thành phần gọi là Mapper được đặt trong presentation hoặc facade layer.
- Đồng thời dữ liệu đầu ra được chuyển đổi nhằm tăng tính bảo mật. Ví dụ (trường hợp dữ liệu gửi lên từ Client gửi lên server bao gồm cả email, mật khẩu, STK ngân hàng. Những thông tin này đã được chuyển đổi trước khi trả về cho người dùng nhằm tăng tính bảo mật danh tính ).

  ![alt text](https://shareprogramming.net/wp-content/uploads/2021/09/layers-4.svg)

#### _Controller_

- Chứa các phương thức gọi và các phương thức hành động
- Controller và các phương thức hành động của nó xử lí các yêu cầu đến từ trình duyệt, lấy dữ liệu model cần thiết và trả về các phản hồi thích hợp

#### _Domain model_

- là các class đại diện cho các domain, hiểu là các đối tượng thuộc business như Client, Report, Department,... chẳng hạn. Trong ứng dụng thực, các class đại diện cho kết quả tính toán, các class làm tham số đầu vào cho service tính toán,... được coi là domain model.

#### _Entity_

- Cũng là domain model nhưng tương ứng với table trong DB, có thể map vào DB được. Lưu ý chỉ có entity mới có thể đại diện cho data trong DB.

#### _Service_
- Thực hiện các Business Logic
- Nhận vào DTO (từ Controller gửi qua) hoặc Domain model (từ các service nội bộ khác). Dữ liệu được xử lý (có thể tương tác với DB), cuối cùng được Service trả về dữ liệu dưới dạng DTO.

#### _Repository_

- Là lớp trung gian giữa tầng Business Logic (Service) và Data Access, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.
- Một nơi duy nhất để thay đổi quyền truy cập dữ liệu cũng như xử lý dữ liệu.
- Một nơi duy nhất chịu trách nhiệm cho việc mapping các bảng vào object.
- Tăng tính bảo mật và rõ ràng cho code.
- Rất dễ dàng để thay thế một Repository với một implementation giả cho việc testing, vì vậy bạn không cần chuẩn bị một cơ sở dữ liệu có sẵn.
