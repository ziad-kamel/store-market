
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                                                               email VARCHAR(50) UNIQUE,
                                                                                 user_name VARCHAR(50) NOT NULL,
                                                                                                       first_name VARCHAR(50) NOT NULL,
                                                                                                                              last_name VARCHAR(50) NOT NULL,
                                                                                                                                                    password text NOT NULL);