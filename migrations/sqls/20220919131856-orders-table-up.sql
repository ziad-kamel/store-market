CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE orders (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                                                                product_id TEXT NOT NULL,
                                                                                user_id TEXT NOT NULL,
                                                                                             quantity integer NOT NULL);