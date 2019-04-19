DO $$
DECLARE 
    COUNTER integer := 0;
    image varchar (255) := '';
BEGIN
    WHILE COUNTER < 50000 LOOP

        WHILE 
        image := (select url from pics where id = (select floor(random()*333 + 1)));
        INSERT INTO photos (url, product_id) values (image, COUNTER);

        COUNTER := COUNTER + 1;
    END LOOP;

END $$