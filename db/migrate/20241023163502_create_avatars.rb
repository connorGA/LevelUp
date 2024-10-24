class CreateAvatars < ActiveRecord::Migration[7.1]
  def change
    create_table :avatars do |t|
      t.references :user, null: false, foreign_key: true
      t.string :outfit
      t.string :accessories

      t.timestamps
    end
  end
end
