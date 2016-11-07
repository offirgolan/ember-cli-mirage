import { Model, hasMany } from 'ember-cli-mirage';
import Schema from 'ember-cli-mirage/orm/schema';
import Db from 'ember-cli-mirage/db';

/*
  A model with a hasMany association can be in eight states
  with respect to its association. This helper class
  returns a parent (and its children) in these various states.

  The return value is an array of the form

    [ parent, [child1, child2...] ]

  where the children array may be empty.
*/
export default class Helper {

  constructor() {
    this.db = new Db();

    this.schema = new Schema(this.db, {
      tag: Model.extend({
        tags: hasMany() // implicit inverse
      })
    });
  }

  savedParentNoChildren() {
    let tag = this.db.tags.insert({ name: 'Red' });

    return [ this.schema.tags.find(tag.id), [] ];
  }

  savedParentNewChildren() {
    let tag = this.schema.tags.create({ name: 'Red' });
    let tag1 = this.schema.tags.new({ name: 'Blue' });
    let tag2 = this.schema.tags.new({ name: 'Green' });

    tag.tags = [ tag1, tag2 ];

    return [ tag, [ tag1, tag2 ] ];
  }

  savedParentSavedChildren() {
    let tag = this.schema.tags.create({ name: 'Red' });
    let tag1 = this.schema.tags.create({ name: 'Blue' });
    let tag2 = this.schema.tags.create({ name: 'Green' });

    tag.tags = [ tag1, tag2 ];

    return [ tag, [ tag1, tag2 ] ];
  }

  savedParentMixedChildren() {
    let tag = this.schema.tags.create({ name: 'Red' });
    let tag1 = this.schema.tags.create({ name: 'Blue' });
    let tag2 = this.schema.tags.new({ name: 'Green' });

    tag.tags = [ tag1, tag2 ];

    return [ tag, [ tag1, tag2 ] ];
  }

  newParentNoChildren() {
    let tag = this.schema.tags.new({ name: 'Red' });

    return [ tag, [] ];
  }

  newParentNewChildren() {
    let tag = this.schema.tags.new({ name: 'Red' });
    let tag1 = this.schema.tags.new({ name: 'Blue' });
    let tag2 = this.schema.tags.new({ name: 'Green' });

    tag.tags = [ tag1, tag2 ];

    return [ tag, [ tag1, tag2 ] ];
  }

  newParentSavedChildren() {
    let tag = this.schema.tags.new({ name: 'Red' });
    let tag1 = this.schema.tags.create({ name: 'Blue' });
    let tag2 = this.schema.tags.create({ name: 'Green' });

    tag.tags = [ tag1, tag2 ];

    return [ tag, [ tag1, tag2 ] ];
  }

  newParentMixedChildren() {
    let tag = this.schema.tags.new({ name: 'Red' });
    let tag1 = this.schema.tags.create({ name: 'Blue' });
    let tag2 = this.schema.tags.new({ name: 'Green' });

    tag.tags = [ tag1, tag2 ];

    return [ tag, [ tag1, tag2 ] ];
  }

  // Unassociated child models, used for setting tests
  savedChild() {
    let insertedTag = this.db.tags.insert({ name: 'Blue' });

    return this.schema.tags.find(insertedTag.id);
  }

  newChild() {
    return this.schema.tags.new({ name: 'Blue' });
  }

}

export const states = [
  'savedParentNoChildren',
  'savedParentNewChildren',
  'savedParentMixedChildren',
  'savedParentSavedChildren',
  'newParentNoChildren',
  'newParentNewChildren',
  'newParentSavedChildren',
  'newParentMixedChildren'
];