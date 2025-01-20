INSERT INTO tb_instrutor (name, telefone, email, cod_matricula, image_profile, especialidades) VALUES
('Carlos Silva', '123456789', 'carlos.silva@example.com', 'INST001', 'profile_default.png','yoga, pilates'),
('Ana Costa', '987654321', 'ana.costa@example.com', 'INST002', 'profile_default.png', 'crossfit, cardio');

INSERT INTO tb_aluno (name, sexo, data_nascimento, telefone, email, endereco, data_matricula, cod_matricula, image_profile) VALUES
('Marcos Silva', '0', '2000-02-05', '98248828698', 'ms8086@gmail.com', 'Rua da Cooperativa', '2025-01-06', 'ALU002', 'profile_default.png' ),
('Carlos Alberto', '0', '1995-09-12', '9988776655', 'carlos.alberto@example.com', 'Rua C, 789', '2023-01-02', 'ALU003', 'profile_default.png'),
('Ana Julia', '1', '1999-03-25', '4455667788', 'ana.julia@example.com', 'Rua D, 321', '2023-02-02', 'ALU004', 'profile_default.png'),
('Fernanda Lima', '1', '2001-06-17', '2233445566', 'fernanda.lima@example.com', 'Rua E, 654', '2023-02-03', 'ALU005', 'profile_default.png'),
('Rafael Torres', '0', '1997-11-11', '6677889900', 'rafael.torres@example.com', 'Rua F, 987', '2023-02-03', 'ALU006', 'profile_default.png'),
('Camila Rocha', '1', '2002-08-20', '1122112233', 'camila.rocha@example.com', 'Rua G, 432', '2023-02-04', 'ALU007', 'profile_default.png'),
('Lucas Matos', '0', '1996-02-05', '3344556677', 'lucas.matos@example.com', 'Rua H, 876', '2023-03-04', 'ALU008', 'profile_default.png'),
('Beatriz Santos', '1', '1994-12-13', '7788990011', 'beatriz.santos@example.com', 'Rua I, 543', '2023-03-05', 'ALU009', 'profile_default.png'),
('Thiago Nunes', '0', '1993-04-22', '9988771122', 'thiago.nunes@example.com', 'Rua J, 210', '2023-03-05', 'ALU010', 'profile_default.png'),
('Larissa Melo', '1', '1991-07-19', '5544332211', 'larissa.melo@example.com', 'Rua K, 765', '2023-04-06', 'ALU011', 'profile_default.png'),
('Diego Costa', '0', '2003-10-01', '6677885544', 'diego.costa@example.com', 'Rua L, 678', '2023-04-06', 'ALU012', 'profile_default.png'),
('Mariana Alves', '1', '1992-01-30', '7766554433', 'mariana.alves@example.com', 'Rua M, 345', '2023-04-07', 'ALU013', 'profile_default.png'),
('Paulo Henrique', '0', '1989-09-09', '4433221100', 'paulo.henrique@example.com', 'Rua N, 901', '2023-04-07', 'ALU014', 'profile_default.png'),
('Sofia Ferreira', '1', '1990-05-18', '3322114455', 'sofia.ferreira@example.com', 'Rua O, 567', '2023-04-08', 'ALU015', 'profile_default.png');
INSERT INTO tb_aula (name, horario, instrutor_id) VALUES
('Yoga', '18:00 - 20:00', 1),
('pilates', '08:00 - 09:00', 1),
('crossfit', '17:00 - 19:00', 2),
('cardio', '10:00', 2);

INSERT INTO dias_semana (id, dia_semana) VALUES 
(1, 'SEGUNDA'),
(1, 'QUARTA'),
(1, 'SEXTA'),
(2, 'TERCA'),
(2, 'QUINTA'),
(3, 'SEXTA'),
(4, 'SEGUNDA'),
(4, 'TERCA');

INSERT INTO tb_avaliacoes (data_avaliacao, peso, altura, resultado, aluno_id) VALUES
('2023-01-10', 70.5, 1.75, '{"imc":"18.6", "pgc":"5.8"}', 1),
('2023-01-15', 65.0, 1.68, '{"imc":"20.6", "pgc":"8.8"}', 2);