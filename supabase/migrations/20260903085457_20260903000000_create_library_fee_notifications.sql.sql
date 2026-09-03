/*
# Create Library Fee Notification Log

This migration creates a table to track fee-expiry email notifications sent to library students,
preventing duplicate emails and providing an audit trail.

1. New Tables
  - `library_fee_notifications`
    - `id` (uuid, primary key) - Unique identifier
    - `student_id` (uuid, references library_students) - Which student was notified
    - `student_email` (text) - Email address the notification was sent to
    - `notification_type` (text) - 'expired' or 'expiring_soon'
    - `membership_end` (date) - The membership end date that triggered the notification
    - `sent_at` (timestamptz) - When the notification was sent
    - `status` (text) - 'sent' or 'failed'

2. Security
  - Enable RLS on library_fee_notifications
  - Authenticated users can view notification history
  - Only the service role (edge function) can insert records

3. Important Notes
  - The edge function uses the service role key to insert notification logs
  - The unique index on (student_id, notification_type, membership_end) prevents
    duplicate notifications for the same membership period
*/

CREATE TABLE IF NOT EXISTS library_fee_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES library_students(id) ON DELETE CASCADE,
  student_email text NOT NULL,
  notification_type text NOT NULL CHECK (notification_type IN ('expired', 'expiring_soon')),
  membership_end date NOT NULL,
  sent_at timestamptz DEFAULT now(),
  status text DEFAULT 'sent' CHECK (status IN ('sent', 'failed'))
);

-- Prevent duplicate notifications for the same student + type + membership period
CREATE UNIQUE INDEX IF NOT EXISTS library_fee_notifications_unique_idx
  ON library_fee_notifications (student_id, notification_type, membership_end);

-- Enable RLS
ALTER TABLE library_fee_notifications ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view notification history
DROP POLICY IF EXISTS "Authenticated users can view fee notifications" ON library_fee_notifications;
CREATE POLICY "Authenticated users can view fee notifications"
  ON library_fee_notifications FOR SELECT
  TO authenticated
  USING (true);