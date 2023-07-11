DROP TABLE IF EXISTS "public"."Testing";

create table public."Testing" (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  name varchar,
  anotherColumn varchar
);

ALTER TABLE "public"."Testing" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "DEFAULT_SELECT_POLICY" ON "public"."Testing";
DROP POLICY IF EXISTS "DEFAULT_DELETE_POLICY" ON "public"."Testing";
DROP POLICY IF EXISTS "DEFAULT_INSERT_POLICY" ON "public"."Testing";
DROP POLICY IF EXISTS "DEFAULT_UPDATE_POLICY" ON "public"."Testing";

CREATE POLICY "DEFAULT_SELECT_POLICY"
  ON "public"."Testing"
  FOR SELECT USING (
    true
);  
CREATE POLICY "DEFAULT_DELETE_POLICY"
  ON "public"."Testing"
  FOR DELETE USING (
    true
); 
CREATE POLICY "DEFAULT_INSERT_POLICY"
  ON "public"."Testing"
  FOR INSERT WITH CHECK (
    true
);  
CREATE POLICY "DEFAULT_UPDATE_POLICY"
  ON "public"."Testing"
  FOR UPDATE USING (
    true
  )
  WITH CHECK (
    true
);  

INSERT INTO "public"."Testing" (name, anothercolumn)
VALUES 
  ('Test', 'test column'),
  ('Another Test', 'Another test column'),
  ('Yet another', 'yet another column');

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;