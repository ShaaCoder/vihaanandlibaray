/*
# Add half-day and full-day library payment types

1. Purpose
- Allow library payments to be categorized as `Half Day` or `Full Day`, matching the new membership types.
- Keep all existing payment types (membership, fine, other) working.

2. Modified Tables
- `library_payments`
  - Expand the `payment_type` check constraint to allow `half_day` and `full_day`.
  - No rows, columns, or existing payment values are deleted or changed.

3. Security
- No RLS policies or permissions are changed.

4. Important Notes
- Stored values are `half_day` and `full_day`; the interface displays them as `Half Day` and `Full Day`.
- Existing records remain valid and unaffected.
*/

ALTER TABLE public.library_payments
  DROP CONSTRAINT IF EXISTS library_payments_payment_type_check;

ALTER TABLE public.library_payments
  ADD CONSTRAINT library_payments_payment_type_check
  CHECK (payment_type IN ('membership', 'fine', 'other', 'half_day', 'full_day'));