class AddFieldsToTasks < ActiveRecord::Migration[7.0]
  def change
    change_table :tasks do |t|
      t.string :name, null: false unless column_exists?(:tasks, :name)
      t.text :description unless column_exists?(:tasks, :description)
      t.integer :frequency, null: false, default: 0 unless column_exists?(:tasks, :frequency)
      t.integer :duration, default: 0 unless column_exists?(:tasks, :duration)
      t.boolean :completed, default: false unless column_exists?(:tasks, :completed)
      t.integer :exp_reward, default: 0 unless column_exists?(:tasks, :exp_reward)
    end
  end
end
