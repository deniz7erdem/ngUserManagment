CREATE TABLE public.users (
    userid SERIAL,
    username text NOT NULL,
    usernick text NOT NULL,
    userpassword text NOT NULL,
    useradmin character(1) NOT NULL
);


INSERT INTO public.users ( username, usernick, userpassword, useradmin) VALUES ( 'Deniz Erdem', 'admin', '$2b$10$.eT9UB8ThfKAC.dcpO85OeOa7ltb3MpWLl.Qa58m33idJCWxZll4O', '1');
INSERT INTO public.users ( username, usernick, userpassword, useradmin) VALUES ('Deniz Erdem', 'deniz7erdem', '$2b$10$4UfN2vjdrtfv42yFFm6BnuoURzALdz6lf1JvSX2I.tggwo39reAwS', '0');
INSERT INTO public.users ( username, usernick, userpassword, useradmin) VALUES ('Ahmet Can', 'acanh', '$2b$10$P5.AIG0Maq4RiRgvFw3qCe6pS2pQPoeU8vKMabsADY6aOuY7bDVFK', '0');
INSERT INTO public.users ( username, usernick, userpassword, useradmin) VALUES ( 'Buse Ç', 'admin2', '$2b$10$8PrMf/mBUlF/yJNesrhgluL/2/OYVyHSXJV4ivBySQm8MsG5gr53O', '1');
INSERT INTO public.users ( username, usernick, userpassword, useradmin) VALUES ( 'Tuna Han', 'tuna35', '$2b$10$YC.58cLHDK7cwMkX.pwdvOd8BO9j9ynuy6RhfrzCCfb/MmwemFuEO', '0');

