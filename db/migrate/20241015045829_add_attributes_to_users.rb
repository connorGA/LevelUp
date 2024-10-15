class AddAttributesToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :username, :string
    add_column :users, :exp, :integer, default: 0, null: false
    add_column :users, :level, :integer, default: 1, null: false

    add_index :users, :username, unique: true
  end
end
