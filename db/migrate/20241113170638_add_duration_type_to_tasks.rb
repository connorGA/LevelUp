class AddDurationTypeToTasks < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :duration_type, :string
  end
end
